import { sum } from "~/utils/sum"

// jest runtime cung cap mot so cong cu de viet code : describe , it , expert duoi dang global func 
// describe: gom cac test case lien quan lai voi nhau
// it: tao 1 test case don le 
// expert: kiem tra kqua tra ve co dung voi mong doi hay khong 
describe("Unit Test: sum():", () => {
  it("Should return the sum of two numbers", () => {
    expect(sum(10,15)).toBe(25);
  })
})