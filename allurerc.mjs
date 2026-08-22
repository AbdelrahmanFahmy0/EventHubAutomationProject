import { execSync } from 'node:child_process';
import { defineConfig } from 'allure';

/**
 * Reads git metadata from the current repository.
 * @returns {Object} An object containing the current git branch and commit hash.
 */
function readGitMetadata() {
  const run = (command) => {
    try {
      return execSync(command, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    } catch {
      return 'unknown';
    }
  };
  return {
    branch: process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || run('git rev-parse --abbrev-ref HEAD'),
    commit: process.env.GITHUB_SHA?.slice(0, 7) || run('git rev-parse --short HEAD'),
  };
}

// Read git metadata and build number from environment variables or local context
const git = readGitMetadata();
const buildNumber = process.env.GITHUB_RUN_NUMBER ?? `local-${Date.now()}`;

export default defineConfig({
  /* Allure report name */
  name: 'EventHub Report',
  /* Allure report output directory */
  output: './test-output/reports/allure-report',
  /* Allure report history directory */
  historyPath: './test-output/reports/allure/history/history.jsonl',
  /* Limit the number of historical test runs to keep in the report */
  historyLimit: 30,
  /* Path to known issues JSON file */
  knownIssuesPath: './test-output/reports/allure/known-issues.json',
  /* Test categories */
  categories: {
    rules: [
      {
        name: 'Test Failures',
        id: 'test-failures',
        matchers: {
          statuses: ['failed']
        },
        groupBy: ['status'],
        groupByMessage: true
      }
    ]
  },
  /* Custom variables to include in the report */
  variables: {
    'Git Branch': git.branch,
    'Git Commit': git.commit,
    'Build Number': String(buildNumber),
    'Generated At': new Date().toISOString(),
  },
  /* Allure plugins configuration */
  plugins: {
    awesome: {
      options: {
        reportName: 'EventHub Report',
        singleFile: true,
        reportLanguage: 'en',
        groupBy: ['epic', 'feature', 'story'],
      }
    }
  }
});