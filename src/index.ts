import fetch from "node-fetch";
import { config } from "dotenv";

config();

const BASE_URL = "http://dev.sleuth.io/graphql";

const fetchIt = async (url: string, body, method = "POST") => {
  fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `apikey ${process.env.API_KEY}`,
    },
  })
    .then(async (data) => {
      console.log(JSON.stringify(await data.json(), undefined, 2));
    })
    .catch((err) => console.error(err));
};

const mutation = `
mutation CreateProject($input: CreateProjectMutationInput!) {
  mutateProject: createProject(input: $input) {
    project {
      slug
    }
    errors {
      field
      messages
    }
  }
}
`;
const variables = { input: { name: "Debug", cltStartDefinition: "COMMIT" } };

fetchIt(BASE_URL, { query: mutation, variables });
