// 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

import { fetch } from "https://deno.land/x/fetch/mod.ts";

async function createRepositoriesAndIssues() {
    const githubToken = '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';
    const baseUrl = 'https://api.github.com';

    const repoNames = ['repo1', 'repo2', 'repo3'];

    const createRepository = async (repoName) => {
        const response = await fetch(`${baseUrl}/user/repos`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: repoName }),
        });

        const repo = await response.json();
        console.log(`Repository '${repoName}' created successfully`);
        return repo;
    };

    const createIssue = async (repo, issueTitle) => {
        const response = await fetch(`${baseUrl}/repos/${repo.owner.login}/${repo.name}/issues`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: issueTitle }),
        });

        const issue = await response.json();
        console.log(`Issue '${issueTitle}' created in '${repo.name}'`);
        return issue;
    };

    const createTestCase = async (issue, testCaseTitle) => {
        const response = await fetch(`${baseUrl}/repos/${issue.repository.owner.login}/${issue.repository.name}/issues/${issue.number}/comments`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ body: testCaseTitle }),
        });

        const testCase = await response.json();
        console.log(`Test case '${testCaseTitle}' created in '${issue.title}'`);
        return testCase;
    };

    // here we are creating repositories, issues, and test cases asynchronously
    for (const repoName of repoNames) {
        const repo = await createRepository(repoName);

        const issue1 = await createIssue(repo, 'Issue 1');
        const issue2 = await createIssue(repo, 'Issue 2');
        const issue3 = await createIssue(repo, 'Issue 3');

        await Promise.all([
            createTestCase(issue1, 'Test Case 1'),
            createTestCase(issue1, 'Test Case 2'),
            createTestCase(issue1, 'Test Case 3'),

            createTestCase(issue2, 'Test Case 4'),
            createTestCase(issue2, 'Test Case 5'),
            createTestCase(issue2, 'Test Case 6'),

            createTestCase(issue3, 'Test Case 7'),
            createTestCase(issue3, 'Test Case 8'),
            createTestCase(issue3, 'Test Case 9'),
        ]);
    }
}

// Run the function
createRepositoriesAndIssues();
