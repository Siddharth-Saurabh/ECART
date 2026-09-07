import Anthropic from '@anthropic-ai/sdk';
import Product from '../model/productModel.js';
import dotenv from 'dotenv';
dotenv.config();

let anthropicClient = null;

const getAnthropicClient = () => {
    if (!anthropicClient) {
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
            throw new Error("ANTHROPIC_API_KEY is not configured");
        }
        anthropicClient = new Anthropic({ apiKey });
    }
    return anthropicClient;
};

export const chatWithAi = async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ success: false, message: 'A valid message is required' });
        }

        // Fetch current catalog products for context
        const products = await Product.find({}).limit(40).lean();
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

        const systemPrompt = `You are "eCart AI" — the intelligent, stylish, and helpful shopping assistant for eCart (created by Siddharth Saurabh).
You help shoppers discover fashion items, answer questions about styling, fits, orders, returns, and navigation.

Store Catalog Context (Current live products):
${JSON.stringify(catalogSummary, null, 2)}

Store Policies & Info:
- Free delivery on orders or standard delivery fee of ₹40.
- 7-day easy return and exchange policy.
- 100% genuine top-brand fashion products for Men, Women, and Kids.
- Payment methods: Cash on Delivery (COD) & Razorpay Online Payment.
- Store sections: Home (/), Collections (/collection), Cart (/cart), Orders (/order), About (/about), Contact (/contact).

Guidelines:
1. Always be welcoming, concise, polite, and enthusiastic.
2. Recommend relevant products from the store catalog above when users ask for suggestions or outfit ideas.
3. If the user asks to go somewhere or do something (e.g. "show me jackets", "open my cart", "where are my orders"), suggest the appropriate page or action.
4. Keep answers crisp and easy to read (use bullet points when listing products).`;

        const messages = [];

        // Add sanitized previous conversation turns if provided
        if (Array.isArray(conversationHistory)) {
            for (const turn of conversationHistory.slice(-8)) {
                if (turn.role === 'user' || turn.role === 'assistant') {
                    messages.push({
                        role: turn.role,
                        content: String(turn.content || '')
                    });
                }
            }
        }

        // Add current user prompt
        messages.push({
            role: 'user',
            content: message
        });

        const anthropic = getAnthropicClient();
        
        // Attempt with Claude 3.5 Sonnet, fallback to Haiku if needed
        let responseMessage = "";
        try {
            const response = await anthropic.messages.create({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 1000,
                system: systemPrompt,
                messages: messages
            });
            responseMessage = response.content?.[0]?.text || "I am here to assist with your shopping!";
        } catch (sonnetErr) {
            console.warn("Sonnet model attempt failed, falling back to Haiku:", sonnetErr.message);
            const fallbackResponse = await anthropic.messages.create({
                model: 'claude-3-haiku-20240307',
                max_tokens: 800,
                system: systemPrompt,
                messages: messages
            });
            responseMessage = fallbackResponse.content?.[0]?.text || "How can I help you find the perfect outfit today?";
        }

        return res.status(200).json({
            success: true,
            reply: responseMessage,
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
