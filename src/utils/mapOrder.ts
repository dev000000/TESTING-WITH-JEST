/**
 * Author: TrungQuanDev: https://youtube.com/@trungquandev
 * ---
 * /**
 * Order an array of objects based on another array & return new Ordered Array
 * If the key is not found in the orderArray, it will be placed at the end of the returned array.
 * The originalArray will not be modified.
 * ---
 * @param {*} originalArray
 * @param {*} orderArray
 * @param {*} key = Key to order
 * @return new Ordered Array
 *
 * For Vietnamese with love :D
 * Sắp xếp một mảng dữ liệu dựa trên key thuộc về một mảng khác và trả về một mảng được sắp xếp.
 * Xác định các phần tử trong array gốc ban đầu (originalArray) xem nó nằm ở đâu trong array thứ 2 (orderArray) (là array mà mình dùng để sắp xếp) bằng cách tìm index (indexOf) rồi sẽ sắp xếp theo index đó bằng hàm sort của Javascript.
 * Nếu key không tìm thấy trong array thứ 2 (orderArray), nó sẽ được sắp xếp ở cuối array trả về.
 */

// originalArray và orderArray mình để type any[] vì trong thực tế nó có thể là bất cứ kiểu dữ liệu nào.


/**
 * Example
 */

// Example:

// list ban dau chua sap xep 

// const originalItems = [
//   { id: 'id-1', name: 'One' },
//   { id: 'id-2', name: 'Two' },
//   { id: 'id-3', name: 'Three' },
//   { id: 'id-4', name: 'Four' },
//   { id: 'id-5', name: 'Five' }
// ];

// list thu tu mong muon sap xep (chua list cac key theo thu tu muon sap xep)
// const itemOrderIds = ['id-5', 'id-4', 'id-2', 'id-3', 'id-1'];

// sap xep theo thuoc tinh nao 
// const key = 'id';

// co nghia la ham nay se sap xep theo 1 thuoc tinh(key) trong list ban dau(originalArray) , thu tu duoc quy dinh trong list orderArray


// sort(a, b) return kq , co nghia la no se dua vao kq duoc return ve de quyet dinh xem phan tu nao dung sau, phan tu nao dung truoc 
// kq = 0 (giu nguyen) , kq > 0 (dat b truoc a), kq < 0 (dat a truoc b)
// chi can hieu: >0 swap , con lai giu nguyen
// ap dung vao vi du sau, ta co mang goc : 4 5 2 3 7 , muon sx tang dan => so nao nho hon dung truoc (vi du se quyet dinh 4 va 5 thang nao dung truoc , thang nao dung sau) , neu viet theo sort thi se (4,5) => {return 4 - 5} return -1 => giu nguyen vi tri (ko swap)
// TONG QUAT SE CO (a,b) => a-b 

export const mapOrder = (originalArray: any[], orderArray: any[], key: string) => {
  // neu khong du ca 3 tham so => tra ve mang rong 
  if (!originalArray || !orderArray || !key) return []
  // du tham so thi tiep tuc tien hanh
  // buoc 1: clone array goc (originalArray) , sau do tien hanh sap xep bang ham sort trong js
  // buoc 2: sau do tien hanh sap xep bang ham sort trong js
  // buoc 2.1: lay vi tri (index) cua a[key], b[key] trong orderArray(mang quy dinh thu tu sap xep)
  // a[key], b[key] o day la gia tri(value) cua thuoc tinh key trong object a 
  // vi du key = 'id' , a = { id: 'id-1', name: 'One' } => a[key] = 'id-1'  <=> a['id'] <=> a.id
  // buoc 2.2: kiem tra neu indexA === -1 => indexA = Infinity(con lai giu nguyen) (indexA === -1 khi va chi khi trong orderArray khong co a[key]) *tuong tu voi indexB
  // buoc 2.3: hieu don gian, neu cai gia tri can so sanh ko co trong list mo ta thi index no bang -1, va o day thang nao co index lon hon thi may phai dung dang sau , the nen muon day nhung thang khong co trong mo ta xuong cuoi hang thi gan index cho no = infinity ( + so 8 nam ngang ) 
  // de dam bao khi return infinity - (-infinity -> +infinity) >= 0 , swap 2 so.
  return [...originalArray].sort((a, b) => {
    const indexA = orderArray.indexOf(a[key])
    const indexB = orderArray.indexOf(b[key])
    return (
      (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB)
    )
  })
}




