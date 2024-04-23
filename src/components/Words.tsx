import { faker } from "@faker-js/faker";

const words = faker.random.words(20);

const Words = () => {
    return <div className="text-4xl text-center text-slate-500">{words}</div>;
}

export default Words;