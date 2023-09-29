# How to start editing

1. Clone this repository
2. Create your branch eg:- yourname-branch
3. Switch to your branch
4. Run npm install
5. create a folder files for storing local files
6. for first time create a .env file
7. copy content from .env.example
8. run npx prisma db push (run this when you change schema)
9. Edit code
10. Push code
    To test s3 api use localstack [s3-ninja](https://s3ninja.net/)
    create new bucket "my-bucket" and set it to public
    Add S3_ENDPOINT=http://localhost:9444
    S3_ACCESS_KEY=test
    S3_SECRET_KEY=test to .env

## Start Your Own Server

    ```
    git clone {this repo link}
    cd {repo name}
    npm install
    npx prisma db push
    npm run dev
    ```

# Our Stack

If you are not familiar with the different technologies used in this project, please refer to the respective docs.

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
