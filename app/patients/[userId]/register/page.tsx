import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";

interface SearchParamProps {
  params: { userId: string };
}

interface User {
  id: string;
  // Add other user properties here
  name?: string;
  email?: string;
}

const Register = async ({ params : {userId}}: SearchParamProps) => {
  const user = await getUser(userId);

  try {
    const [user, patient] = await Promise.all([
      getUser(userId),
      getPatient(userId)
    ]);

    if (patient) {
      redirect(`/patients/${userId}/new-appointment`);
    }

    return (
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container">
          <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="CarePlus logo"
              className="mb-12 h-10 w-fit"
              priority
            />

            <Suspense fallback={<div>Loading form...</div>}>
              <RegisterForm user={user} />
            </Suspense>

            <p className="copyright py-12">© {new Date().getFullYear()} CarePluse</p>
          </div>
        </section>

        <Image
          src="/assets/images/register-img.png"
          height={1000}
          width={1000}
          alt="Patient registration illustration"
          className="side-img max-w-[390px]"
          priority
        />
      </div>
    );
  } catch (error) {
    console.error("Error in Register page:", error);
    redirect("/error"); // Redirect to error page or handle differently
  }
};

export default Register;