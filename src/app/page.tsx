import HomePage from "@/components/home/HomePage";
import {Metadata} from "next";
import {homePageDTOlMock} from "@/components/home/HomePageDTOlMock";
import {HomePageDTO} from "@/components/home/HomePageDTO";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: 'Chaincue Real Estate',
  description: ""
}

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN

const getData = async (token: string): Promise<HomePageDTO> => {
  return fetch(`${CLIENT_DOMAIN}/api/home`, {
    method: "GET",
    cache: "no-store",
    next: {tags: ["home"]},
    headers: {Authorization: "Bearer " + token},
  }).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(res)
  }).catch(reason => {
    console.error(reason)
  });
};
const d = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1U0Z3MXdWZ3JOUVJqOXdnNjdQUXNTbmxMV1RxTmd5Ry1tZkdIQ0pvby0wIn0.eyJleHAiOjE2OTkzODI0NDMsImlhdCI6MTY5OTM4MjE0MywiYXV0aF90aW1lIjoxNjk5MzgxNzc1LCJqdGkiOiIwZDNmNTliNC01ZTFhLTRiZGQtYWMyOS1mMzkyM2UyYjBhMDMiLCJpc3MiOiJodHRwczovL2F1dGguY2hhaW5jdWV0LmNvbS9hdXRoL3JlYWxtcy9yZWFsLWVzdGF0ZSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJkOWUyNzZmYS1jZGUyLTQ4ZjQtOWY3Yy1jZDY5OTA3MDE5MGMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWFsLWVzdGF0ZS1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiNzFjMGU2MmItZGQzMy00N2E5LTg4M2ItNGMwNWE3NTQzN2FmIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtcmVhbC1lc3RhdGUiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiNzFjMGU2MmItZGQzMy00N2E5LTg4M2ItNGMwNWE3NTQzN2FmIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJ0ZXN0dXNlciB1c2VyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdHVzZXJAY2hhaW5jdWUuY29tIiwiZ2l2ZW5fbmFtZSI6InRlc3R1c2VyIiwiZmFtaWx5X25hbWUiOiJ1c2VyIiwiZW1haWwiOiJ0ZXN0dXNlckBjaGFpbmN1ZS5jb20ifQ.bZTrSwb-JO4PJrfiMU35TDHELvy7UUteU8VmxNpgtj_wor6OQpxfQFPLJDslU97ZjP0SgURWNWiNp25x3jzdbjSPqfcz80Fy6VcOCaNLqCQdrm4chUEHhocwDxthW2o1Lccnxe14e_u77Cu_m6b_om1kmjE0nzzrGvV_Vtq_hivZRxYU4ohsb5qcIHYY1aPT_TjiDcdW4RrOHxO9jdQ-DTiu0igK7BkYf-GPw_J7Q9UYaFk8hiHurRydSBfKHDAQ_klFNNYyVNukpkemKTlBn-cIPLna__lM5pZScgDAcNCVLRGijR3pDj1X-6KmrtJh1ZR-bJ_4EViZmAlaack3Rw"
export default async function Page() {
  const session = await getServerSession(authOptions)
  console.log(session?.access_token)
  const data = await getData(session?.access_token ? session.access_token : d)

  return (
      < >
        <HomePage data={data ? data : homePageDTOlMock}/>
      </>
  )
}
