// AWS Amplify configuration file
module.exports = {
  // General configuration
  name: "next-auth-roles",
  type: "javascript",
  framework: "next",

  // Amplify service configuration
  amplify: {
    // Auth configuration (placeholder - would be configured with real values)
    auth: {
      identityPoolName: "nextAuthRolesIdentityPool",
      userPoolName: "nextAuthRolesUserPool",
      webClientId: "EXAMPLE_CLIENT_ID",
      region: "us-east-1",
    },

    // API configuration (placeholder - would be configured with real values)
    api: {
      name: "nextAuthRolesApi",
      endpoint: "https://example-api.com",
    },
  },

  // Build configuration
  build: {
    baseDirectory: ".next",
    outputDirectory: "out",
  },

  // Environment variables (examples)
  environment: {
    NEXT_PUBLIC_API_URL: "https://api.example.com",
    NEXT_PUBLIC_APP_ENV: "production",
  },
}
