import {
  Children,
  JSXElementConstructor,
  PropsWithChildren,
  ReactNode,
  isValidElement,
} from "react";

type Slots = Record<
  string,
  | JSXElementConstructor<any>
  | {
      component: JSXElementConstructor<any>;
      array?: boolean;
    }
>;

type UseSlots<TSlots extends Slots> = Partial<Record<keyof TSlots, ReactNode>>;

export function useSlots<TSlots extends Slots>(
  children: PropsWithChildren["children"],
  slots: TSlots
): UseSlots<TSlots> {
  const result: Partial<Record<keyof TSlots, ReactNode | ReactNode[]>> = {};

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      throw new Error(`Unexpected slot type: '${child?.toString()}'.`);
    }

    for (const [slotName, slotType] of Object.entries(slots)) {
      const slotKey = slotName as keyof TSlots;

      if ("component" in slotType && slotType.component === child.type) {
        if (slotKey in result && !slotType.array) {
          throw new Error(`Slot '${slotName}' is defined multiple times.`);
        }

        if (slotType.array) {
          const prev = result[slotKey];

          if (Array.isArray(prev)) {
            prev.push(child);
          } else {
            result[slotKey] = [child];
          }
        } else {
          result[slotKey] = child;
        }
      } else if (slotType === child.type) {
        if (slotKey in result) {
          throw new Error(`Slot '${slotName}' is defined multiple times.`);
        }

        result[slotKey] = child;
      }
    }
  });

  return result;
}
