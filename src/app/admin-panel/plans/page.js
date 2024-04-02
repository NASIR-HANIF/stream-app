import AdminPanel from "../../../../Components/AdminPanel/AdminPanel";
import Plans from "../../../../Components/AdminPanel/Plans/Plans";
import Head from "next/head";
const Page = () => {
    const design = (
        <>

            <AdminPanel>
                <Head>
                    <title>Plans - Adminpanel StreamJust - Watch TV Shows Online, Watch Movies Online </title>
                    <meta name="robots" content="noindex,nofollow" key="robots" />
                </Head>
                <Plans />
            </AdminPanel>

        </>
    );
    return design
}
export default Page