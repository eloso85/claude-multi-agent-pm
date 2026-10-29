import Anthropic from "@anthropic-ai/sdk"

if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
        "Missing ANTHROPIC_API_KEY enviorment variable"
    );
}

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export default anthropic