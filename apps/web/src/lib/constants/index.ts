import { TPageLebel, TPageSize } from "@/lib/types";

export const pageSizes: TPageSize[] = [
  {
    id: "letter",
    title: "Letter",
    width: 1000,
    height: 1294,
  },
  {
    id: "tabloid",
    title: "Tabloid",
    width: 1000,
    height: 1480,
  },
  {
    id: "legal",
    title: "Legal",
    width: 1000,
    height: 1580,
  },
  {
    id: "statement",
    title: "Statement",
    width: 1000,
    height: 1545,
  },
  {
    id: "executive",
    title: "Executive",
    width: 1000,
    height: 1380,
  },
  {
    id: "folio",
    title: "Folio",
    width: 1000,
    height: 1530,
  },
  {
    id: "a3",
    title: "A3",
    width: 1000,
    height: 1415,
  },
  {
    id: "a4",
    title: "A4",
    width: 1000,
    height: 1360,
  },
  {
    id: "a5",
    title: "A5",
    width: 1000,
    height: 1420,
  },
  {
    id: "b4",
    title: "B4",
    width: 1000,
    height: 1410,
  },
  {
    id: "b5",
    title: "B5",
    width: 1000,
    height: 1420,
  },
];

export const pageSizesMap = pageSizes.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<TPageLebel, TPageSize>
);

// | Name          | Inches (W × H) | Pixels (W × H) @96 PPI | Aspect Ratio (W\:H) |
// | ------------- | -------------- | ---------------------- | ------------------- |
// | **Letter**    | 8.5 × 11       | 816 × 1056             | 1 : 1.294           |
// | **Tabloid**   | 11 × 17        | 1056 × 1632            | 1 : 1.48            |
// | **Legal**     | 8.5 × 14       | 816 × 1344             | 1 : 1.58            |
// | **Statement** | 5.5 × 8.5      | 528 × 816              | 1 : 1.545           |
// | **Executive** | 7.25 × 10.5    | 696 × 1008             | 1 : 1.38            |
// | **Folio**     | 8.5 × 13       | 816 × 1248             | 1 : 1.53            |
// | **A3**        | 11.69 × 16.54  | 1122 × 1587            | 1 : 1.415           |
// | **A4**        | 8.27 × 11.69   | 794 × 1122             | 1 : 1.36            |
// | **A5**        | 5.83 × 8.27    | 560 × 794              | 1 : 1.42            |
// | **B4**        | 9.84 × 13.90   | 945 × 1334             | 1 : 1.41            |
// | **B5**        | 6.93 × 9.84    | 665 × 945              | 1 : 1.42            |
