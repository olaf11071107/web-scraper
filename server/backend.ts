import { GenezioDeploy, GenezioMethod } from "@genezio/types";

@GenezioDeploy()
export class BackendService {
  @GenezioMethod()
  async GetGitHubStars(): Promise<string> {
    const extractStarsNumber = (str: string) => {
      const regex = /(\d+)(?=\susers\sstarred\sthis\srepository)/;
      const match = str.match(regex);
      return match ? match[1] : null;
    };

    const url = "https://github.com/nodejs/node"; // Add your own github repo url
    // return scraped data

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch the page");
    }

    const html = await response.text();
    const stars = extractStarsNumber(html);

    return stars || "0";
  }
}
