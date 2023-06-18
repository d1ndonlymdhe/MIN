# How to start editing

1. Clone this repository
2. Create your branch
3. Switch to your branch
4. Run npm install
5. create a folder files for storing local files
6. for first time create a .env file
7. copy content from .env.example
9. run npx prisma db push (run this when you change schema)
8. Edit code
9. Push code
To test s3 api use localstack [s3-ninja](https://s3ninja.net/)
create new bucket "my-bucket" and set it to public
Add S3_ENDPOINT=http://localhost:9444
S3_ACCESS_KEY=test
S3_SECRET_KEY=test to .env
## Start Your Own Server

    ```bash
    git clone {this repo link}
    cd {repo name}
    npm install
    npx prisma db push
    npm run dev
    ```

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.


## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
