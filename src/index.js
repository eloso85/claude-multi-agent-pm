import { createProjectPlan } from "./agents/planner.js";

async function startApplication() {
    console.log("Claude Multi-Agent Project Manager\n");

    const projectDescription =
        "Build an employee management system with authentication, departments, and employee records.";

    try {
        console.log('Planner Agent is analyzing the project....\n');

        const plan = await createProjectPlan(projectDescription);

        console.log("PROJECT PLAN");
        console.log("============");

        console.log(JSON.stringify(plan, null, 2));
    } catch (error) {
        console.error("Planner Agent failed", error.message)
        process.exitCode = 1
    }
}

startApplication();