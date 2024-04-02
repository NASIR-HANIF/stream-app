import Jobs from "../../../../Components/AdminPanel/Jobs/Jobs";
import AdminPanel from "../../../../Components/AdminPanel/AdminPanel";
import Head from "next/head";

const page = () => {
    const design = (
        <>
            <AdminPanel>
                <Head>
                    <title>Jobs - Adminpanel StreamJust - Watch TV Shows Online, Watch Movies Online </title>
                    <meta name="robots" content="noindex,nofollow" key="robots" />
                </Head>
                <Jobs />
            </AdminPanel>
        </>
    );
    return design
}

export default page

