import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";

export const loadGithubProject = async (
  githubUrl: string,
  githubToken?: string,
) => {
  const loader = new GithubRepoLoader(githubUrl, {
    accessToken: githubToken || "",
    branch: "main",
    ignoreFiles: [
      "packaghe-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "bun.lock",
    ],
    recursive: true,
    unknown: "warn",
    maxConcurrency: 5,
  });
  const docs = await loader.load();
  return docs;
};

console.log(await loadGithubProject("https://github.com/i-mkarmakar/DBlitz"));
