import objectDiff from "./objectDiff";

xdescribe("utils", () => {
  describe("#objectDiff", () => {
    describe("matching objects", () => {
      describe("returns an empty object", () => {
        it("numbers", () => {
          const objectA = { a: 4, b: 2 };
          const objectB = { a: 4, b: 2 };

          const expectedResult = {};

          expect(objectDiff(objectA, objectB)).toEqual({});
        });

        it("strings", () => {
          const objectA = { a: "test", b: "anotherTest" };
          const objectB = { a: "test", b: "anotherTest" };

          const expectedResult = {};

          expect(objectDiff(objectA, objectB)).toEqual({});
        });

        it("arrays", () => {
          const objectA = { a: "test", b: [1, 2, 3] };
          const objectB = { a: "test", b: [1, 2, 3] };

          const expectedResult = {};

          expect(objectDiff(objectA, objectB)).toEqual({});
        });

        it("objects", () => {
          const objectA = { a: "test", b: { nestedA: 1 } };
          const objectB = { a: "test", b: { nestedA: 1 } };

          const expectedResult = {};

          expect(objectDiff(objectA, objectB)).toEqual({});
        });
      });
    });

    describe("non-matching objects", () => {
      describe("returns a tuple of mismatching values for each mismatching field", () => {
        it("numbers", () => {
          const objectA = { a: 4, b: 2 };
          const objectB = { a: 4, b: 3 };

          const expectedResult = { b: [2, 3] };

          expect(objectDiff(objectA, objectB)).toEqual(expectedResult);
        });

        it("strings", () => {
          const objectA = { a: "test", b: "objectAValue" };
          const objectB = { a: "test", b: "objectBValue" };

          const expectedResult = { b: ["objectAValue", "objectBValue"] };

          expect(objectDiff(objectA, objectB)).toEqual(expectedResult);
        });

        it("arrays", () => {
          const objectA = { a: "test", b: [1, 2, 3] };
          const objectB = { a: "test", b: [3, 4, 5] };

          const expectedResult = { b: [[1, 2, 3], [3, 4, 5]] };

          expect(objectDiff(objectA, objectB)).toEqual(expectedResult);
        });

        describe("nested objects", () => {
          it("1 level", () => {
            const objectA = { a: "test", b: { c: 1 } };
            const objectB = { a: "test", b: { c: 2 } };

            const expectedResult = { b: { c: [1, 2] } };

            expect(objectDiff(objectA, objectB)).toEqual(expectedResult);
          });

          it("2 levels", () => {
            const objectA = { a: "test", b: { c: { d: 1 } } };
            const objectB = { a: "test", b: { c: { d: 2 } } };

            const expectedResult = { b: { c: { d: [1, 2] } } };

            expect(objectDiff(objectA, objectB)).toEqual(expectedResult);
          });

          it("3 levels", () => {
            const objectA = { a: "test", b: { c: { d: { e: 1 } } } };
            const objectB = { a: "test", b: { c: { d: { e: 2 } } } };

            const expectedResult = { b: { c: { d: { e: [1, 2] } } } };

            expect(objectDiff(objectA, objectB)).toEqual(expectedResult);
          });
        });

        it("right-side object missing keys", () => {
          const objectA = { a: "test", b: "value" };
          const objectB = { a: "test" };

          const expectedResult = { b: ["value", undefined] };

          expect(objectDiff(objectA, objectB)).toEqual(expectedResult);
        });

        it("left-side object missing keys", () => {
          const objectA = { a: "test" };
          const objectB = { a: "test", b: "value" };

          const expectedResult = { b: [undefined, "value"] };

          expect(objectDiff(objectA, objectB)).toEqual(expectedResult);
        });
      });
    });
  });
});
