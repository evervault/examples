import Image from 'next/image'

export default function GitHubComponent() {
    return (
        <a
            href={"https://github.com/login/oauth/authorize?scope=user:email&client_id=" + process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}
            target="_blank"
            rel="noopener noreferrer"
        >
            Sign up with {' '}
            <Image
                src="/github.png"
                alt="Github Logo"
                width={24}
                height={24}
                priority
            />
        </a>
    );
};