import Banner from "../components/Home/Banner";
import Section from "../components/Home/Section";
import ListProduct from "../components/Home/ListProduct";

export default function Home() {
  return (
    <div className="">
      <main className="mt-20 ">
        <Banner />
        <Section />
        <ListProduct />
      </main>
    </div>
  );
}
