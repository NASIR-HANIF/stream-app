import AdminPanel from "../../../../Components/AdminPanel/AdminPanel";
import Movies from "../../../../Components/AdminPanel/Movies/Movies";
import Head from "next/head";
const Page = () => {
    const design = (
        <>

            <AdminPanel>
                <Head>
                    <title>Movies - Adminpanel StreamJust - Watch TV Shows Online, Watch Movies Online </title>
                    <meta name="robots" content="noindex,nofollow" key="robots" />
                </Head>
                <Movies />
            </AdminPanel>

        </>
    );
    return design
}
export default Page