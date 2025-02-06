import SignIn from "@/components/auth/SignIn";

export default function SignInPage() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <h1 className="text-2xl font-semibold text-primary mb-6">Sign in with Google</h1>
            <SignIn />
        </div>
    );
}
