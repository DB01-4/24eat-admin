import React from "react";
import { render } from "@testing-library/react"
import CategoryList from "../Components/Category/CategoryList";
import '@testing-library/jest-dom/extend-expect';


it("renders category data", async () => {
  const fakeCategory =[
    {
        name: "kaas",
        description: "verhard melk",
        image: "image"
    }
]

  const apiFunc = (response) => jest.spyOn(global, "fetch").mockImplementation(() => {
    return Promise.resolve(response)
    })

  const {findByTestId} = render(<CategoryList
     categories={fakeCategory} 
     url="url" 
     onDelete="delete" 
     />);

  const a = await apiFunc(fakeCategory);
  expect(await findByTestId("category-name")).toHaveTextContent(fakeCategory[0].name);
  expect(await findByTestId("category-description")).toHaveTextContent(fakeCategory[0].description);
});