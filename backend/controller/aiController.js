import Anthropic from '@anthropic-ai/sdk';
import Product from '../model/productModel.js';
import dotenv from 'dotenv';
dotenv.config();

// Intelligent Built-In Fashion Assistant Engine (handles offline / fallback gracefully)
const generateSmartLocalResponse = (message, catalog = []) => {
    const q = message.toLowerCase().trim();

    // 1. Greetings
    if (/^(hi|hello|hey|greetings|hola|namaste)/i.test(q)) {
        return "👋 Hello! I'm your **eCart AI Stylist**. I can help you find trending outfits, check sizes, navigate the store, or recommend pieces from our latest Men's, Women's, and Kids' collections. What are you looking for today?";
    }

    // 2. Return / Exchange / Shipping Policies
    if (q.includes("return") || q.includes("exchange") || q.includes("policy") || q.includes("refund")) {
        return "📦 **Our Policy:** We offer a **7-day hassle-free return and exchange guarantee** with doorstep pickup! All returned items must be unused with tags attached. Refunds are processed within 24–48 hours.";
    }
    if (q.includes("delivery") || q.includes("shipping") || q.includes("fee") || q.includes("charges")) {
        return "🚚 **Delivery Info:** We offer fast pan-India shipping! Standard delivery fee is just ₹40 (free on promotional offers). Typical delivery timeframe is 3–5 business days.";
    }
    if (q.includes("payment") || q.includes("cod") || q.includes("razorpay") || q.includes("pay")) {
        return "💳 **Payment Methods:** We accept **Cash on Delivery (COD)** as well as instant online payments via **Razorpay** (UPI, Credit/Debit Cards, Net Banking, and Wallets) with 256-bit SSL encryption.";
    }

    // 3. Navigation intents
    if (q.includes("cart") || q.includes("bag")) {
        return "🛒 You can view and manage your selected items anytime in your **[Cart](/cart)**.";
    }
    if (q.includes("order") || q.includes("track")) {
        return "📋 Check your order progress and delivery status in your **[My Orders](/order)** dashboard.";
    }

    // 4. Bestseller search
    if (q.includes("bestseller") || q.includes("best seller") || q.includes("trending") || q.includes("popular") || q.includes("top")) {
        const bestsellers = catalog.filter(p => p.bestseller).slice(0, 4);
        if (bestsellers.length > 0) {
            const list = bestsellers.map(p => `• **${p.name}** (₹${p.price}) - *${p.category} / ${p.subCategory}*`).join("\n");
            return `🔥 **Top Trending Bestsellers Right Now:**\n\n${list}\n\nExplore all in our **[Collections](/collection)**!`;
        }
    }

    // 5. Category specific (Men / Women / Kids)
    let matchedCategory = null;
    if (q.includes("women") || q.includes("girl") || q.includes("female") || q.includes("lady")) matchedCategory = "Women";
    else if (q.includes("kid") || q.includes("boy") || q.includes("child")) matchedCategory = "Kids";
    else if (q.includes("men") || q.includes("man") || q.includes("male") || q.includes("gent")) matchedCategory = "Men";

    // 6. SubCategory specific (Jacket, Shirt, Topwear, Winterwear, Bottomwear)
    let matchedSub = null;
    if (q.includes("jacket") || q.includes("coat") || q.includes("winter") || q.includes("hoodie")) matchedSub = "WinterWear";
    else if (q.includes("shirt") || q.includes("t-shirt") || q.includes("top")) matchedSub = "TopWear";
    else if (q.includes("pant") || q.includes("trouser") || q.includes("bottom") || q.includes("jean")) matchedSub = "BottomWear";

    let filtered = catalog;
    if (matchedCategory) {
        filtered = filtered.filter(p => p.category?.toLowerCase() === matchedCategory.toLowerCase());
    }
    if (matchedSub) {
        filtered = filtered.filter(p => p.subCategory?.toLowerCase() === matchedSub.toLowerCase());
    }

    // Text keyword match
    if (filtered.length === catalog.length) {
        const words = q.split(" ").filter(w => w.length > 2);
        const keywordMatches = catalog.filter(p => 
            words.some(w => p.name?.toLowerCase().includes(w) || p.description?.toLowerCase().includes(w))
        );
        if (keywordMatches.length > 0) {
            filtered = keywordMatches;
        }
    }

    if (filtered.length > 0 && filtered.length < catalog.length) {
        const items = filtered.slice(0, 4);
        const list = items.map(p => `• **${p.name}** — ₹${p.price} (Sizes: ${p.sizes?.join(", ") || "Standard"})`).join("\n");
        return `✨ **Here are some curated recommendations for you:**\n\n${list}\n\nWould you like to explore more in our **[Catalog](/collection)**?`;
    }

    // 7. General Fashion / Styling Advice fallback
    return `✨ I'm here to help you style the perfect look! You can browse our diverse range of casual wear, formal fits, and seasonal jackets in our **[Collections](/collection)**.\n\nTry asking me:\n• *"Show me Men's jackets"*\n• *"Recommend trending bestsellers"*\n• *"What is your return policy?"*`;
};

export const chatWithAi = async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ success: false, message: 'A valid message is required' });
        }

        // Fetch current catalog products for context
        const products = await Product.find({}).limit(50).lean();
        const catalogSummary = products.map(p => ({
            id: p._id,
            name: p.name,
            category: p.category,
            subCategory: p.subCategory,
            price: p.price,
            sizes: p.sizes,
            bestseller: p.bestseller,
            description: p.description
        }));

        const apiKey = process.env.ANTHROPIC_API_KEY;

        // Attempt Claude API if API key is provided
        if (apiKey && apiKey.trim() !== '') {
            try {
                const anthropic = new Anthropic({ apiKey });

                const systemPrompt = `You are "eCart AI" — the intelligent, stylish, and polite shopping assistant for eCart (created by Siddharth Saurabh).
Store Catalog:
${JSON.stringify(catalogSummary, null, 2)}

Store Policies:
- 7-day easy returns & exchanges.
- Payment: COD and Razorpay.
- Fast shipping with ₹40 delivery fee.

Guidelines:
1. Always be polite, modern, concise, and helpful.
2. Recommend live products from the catalog above when asked.
3. Keep responses clean and well-structured using markdown.`;

                const messages = [];
                if (Array.isArray(conversationHistory)) {
                    for (const turn of conversationHistory.slice(-6)) {
                        if (turn.role === 'user' || turn.role === 'assistant') {
                            messages.push({
                                role: turn.role,
                                content: String(turn.content || '')
                            });
                        }
                    }
                }

                messages.push({
                    role: 'user',
                    content: message
                });

                const response = await anthropic.messages.create({
                    model: 'claude-3-haiku-20240307',
                    max_tokens: 600,
                    system: systemPrompt,
                    messages: messages
                });

                const replyText = response.content?.[0]?.text;
                if (replyText) {
                    return res.status(200).json({
                        success: true,
                        reply: replyText,
                        provider: 'claude',
                        timestamp: new Date().toISOString()
                    });
                }
            } catch (apiErr) {
                console.warn("Anthropic API call encountered an issue, seamlessly using built-in Smart Stylist engine:", apiErr.message);
            }
        }

        // Seamless fallback to intelligent built-in stylist engine with catalog context
        const localReply = generateSmartLocalResponse(message, catalogSummary);
        return res.status(200).json({
            success: true,
            reply: localReply,
            provider: 'smart-stylist',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("AI Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to process AI request",
            error: error.message
        });
    }
};
