import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
    schema: "https://graphql-pokemon2.vercel.app/",
    documents: "./src/**/*.tsx",
    generates: {
        "./src/generated/": {
            preset: "client",
            plugins: [],
            presetConfig: {
              gqlTagName: 'gql',
            }
        },
    },
    ignoreNoDocuments: true,
}

export default config