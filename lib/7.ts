// This all thing should definitely be refactored with a class
// Parsing with regex is also painfully slow

type Node = {
  name: string;
  type: "file" | "dir";
  meta: {
    size: number;
    format?: string;
  };
  parent: Node | null;
  children: Array<Node> | null;
};

const parseInput = (input: string) => {
  const root: Node = {
    name: "/",
    type: "dir",
    meta: {
      size: 0,
    },
    parent: null,
    children: [],
  };

  // this is deliberate: we want the reference
  let curNode = root;

  input
    .trimEnd()
    .split("\n")
    .slice(1)
    .forEach((line) => {
      // ignore "$ ls"
      if (/^\$\scd/.test(line)) {
        const match = line.match(/cd\s(.+)$/);

        if (!match) {
          throw new Error("Failed to match dir name");
        }

        const [_, name] = match;

        // check if we are walking back
        if (name === "..") {
          if (curNode.parent) {
            curNode = curNode.parent;
            return;
          }

          throw new Error("Current node has no parent");
        }

        const child = curNode
          .children
          ?.find((c) => c.name === name);

        if (!child) {
          throw new Error(`No such dir ${name}`);
        }

        curNode = child;
        return;
      } else if (/^dir/.test(line)) {
        const match = line.match(/dir (\w+)/);
        if (!match) {
          throw new Error("Failed to match dir name");
        }

        const [_, name] = match;
        const newChild: Node = {
          name,
          type: "dir",
          meta: {
            size: 0,
          },
          parent: curNode,
          children: [],
        };

        curNode.children?.push(newChild);
        return;
      } else if (/^\d/.test(line)) {
        const match = line.match(/(\d+)\s(\w+)/);

        if (!match) {
          throw new Error("Failed to match file");
        }

        const [_, size, name] = match;
        const newChild: Node = {
          name,
          type: "file",
          meta: {
            size: Number(size),
          },
          parent: curNode,
          children: null,
        };

        curNode.children?.push(newChild);

        // update size of each parent
        curNode.meta.size += Number(size);
        let parent = curNode.parent;
        while (parent) {
          parent.meta.size += Number(size);
          parent = parent.parent;
        }
        return;
      }
    });

  return root;
};

// I really have no idea how to fix this, ts seems to get lost on yield*
// deno-lint-ignore no-explicit-any
function* traverse(t: Node): any {
  if (t.children) {
    yield t.meta.size;

    for (let i = 0; i < t.children?.length; i++) {
      yield* traverse(t.children[i]);
    }
  }
}

export const partOne = (input: string) => {
  const root = parseInput(input);

  return (Array.from(traverse(root)) as number[])
    .filter((el) => el <= 100000)
    .reduce((acc, cur) => acc + cur);
};

export const partTwo = (input: string) => {
  const root = parseInput(input);
  const totalSize = 70000000;
  const updateSize = 30000000;
  const unused = totalSize - root.meta.size;
  const needed = updateSize - unused;

  return (Array.from(traverse(root)) as number[])
    .filter((el) => el >= needed)
    .reduce((a, b) => Math.min(a, b));
};
