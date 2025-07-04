import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";

interface SearchParamProps {
  params: { userId: string };
}

const Register = async ({ params: { userId } }: SearchParamProps) => {
  // Fetch user and patient in parallel
  const [user, patient] = await Promise.all([
    getUser(userId),
    getPatient(userId),
  ]);

  // Redirect if patient already exists
  if (patient) {
    redirect(`/patients/${userId}/new-appointment`);
  }

  // Render the register page
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

          <p className="copyright py-12">
            © {new Date().getFullYear()} CarePluse
          </p>
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
};

export default Register;
