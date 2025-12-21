import { validateEmail } from "~/utils/validateEmail";

describe("Unit Test: validateEmail():",() => {
  const cases: any[] = [
    ['hvang@gmail.com', true],
    ['hvanggmail.com', false],
    ['@hvanggmail.com', false],
    // [{email: 'hvang@gmail.com' }, true] test check %P
  ]

  // dung each de lap qua cac cases(bo du lieu) , va test cho tung case , khong phai viet lap di lap lai logic cho tung du lieu cua bo du lieu
  // %p su dung duoi dang placeholder kieu pretty-format in ra log gia tri goc => de debug khi test fail 
  it.each(cases)("%p => %p",(email, expected) => {
    expect(validateEmail(email)).toBe(expected)
  })
  
})