import anthropic from "../config/anthropic.js";

const PLANNER_SYSTEM_PROMPT = `
    You are a senior software project planning agent.

Your responsibilities:
- Analyze software project requirements.
- Break projects into actionable development tasks.
- Identify dependencies between tasks.
- Return valid JSON only.

Your response must follow this structure:

{
  "projectName": "Project name",
  "tasks": [
    {
      "id": 1,
      "title": "Task title",
      "description": "Task description",
      "dependencies": []
    }
  ]
}

Rules:
- Task IDs must be unique integers.
- Dependencies must reference existing task IDs.
- Tasks must be organized in logical implementation order.
- Do not include Markdown code fences.

`;

const PROJECT_PLAN_SCHEMA = {
    type: "object",
    properties: {
        projectName: { type: "string" },
        tasks: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    title: { type: "string" },
                    description: { type: "string" },
                    dependencies: {
                        type: "array",
                        items: { type: "integer" }
                    }
                },
                required: ["id", "title", "description", "dependencies"],
                additionalProperties: false
            }
        }
    },
    required: ["projectName", "tasks"],
    additionalProperties: false
}

export async function createProjectPlan(projectDescription) {
    const response = await anthropic.messages.create({
        model: "claude-sonnet-5-5",
        max_tokens: 2000,
        system: PLANNER_SYSTEM_PROMPT,
        messages: [
            {
                role: "user",
                content: projectDescription
            }
        ],
        output_config: {
            format: {
                type: "json_schema",
                schema: PROJECT_PLAN_SCHEMA
            }
        }
    })

    const responseText = response.content
        .filter((block) => block.type === "text")
        .map((block) => block.text)
        .join("")

    return JSON.parse(responseText)
}