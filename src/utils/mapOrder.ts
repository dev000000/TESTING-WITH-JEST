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
export const mapOrder = (originalArray: any[], orderArray: any[], key: string) => {
  if (!originalArray || !orderArray || !key) return []
  return [...originalArray].sort((a, b) => {
    const indexA = orderArray.indexOf(a[key])
    const indexB = orderArray.indexOf(b[key])
    return (
      (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB)
    )
  })
}
