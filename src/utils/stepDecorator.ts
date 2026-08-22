import { test } from '@playwright/test';

/**
 * Wraps a method in a Playwright test step.
 * Supports parameter interpolation: @step('Login as {username}')
 * @param title Optional step name; defaults to `ClassName.methodName`
 */
export function step(title?: string) {
    return function (target: Function, context: ClassMethodDecoratorContext) {
        return async function (this: any, ...args: any[]) {
            let stepName = title || `${this.constructor.name}.${context.name as string}`;
            // Get parameter names from the method
            const paramNames = target.toString().match(/\(([^)]*)\)/)?.[1]?.split(',').map(p => p.trim()) || [];
            // Replace {param} with argument values
            paramNames.forEach((param, index) => {
                const value = args[index];
                stepName = stepName.replace(`{${param}}`,
                    typeof value === 'object' ? JSON.stringify(value) : String(value)
                )
            });
            // Execute the step with the formatted name
            return test.step(stepName, async () => {
                return await target.call(this, ...args);
            }, { box: true });
        };
    };
};