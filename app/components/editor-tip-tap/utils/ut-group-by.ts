import { groupBy } from "~/lib/group-by";
import type { ButtonMenuTiptap, GroupSectionsMenu, GroupSectionsMenuBubble, GroupToolbarTiptap, OptionsMenu } from "../type";

export function groupToolbarOptions(
    options: OptionsMenu[]
): GroupSectionsMenu[] {
    const groups = new Map<GroupToolbarTiptap, OptionsMenu[]>();

    for (const option of options) {
        // Lewati jika group tidak ada
        if (!option.group) continue;

        const items = groups.get(option.group);

        if (items) {
            items.push(option);
        } else {
            groups.set(option.group, [option]);
        }
    }

    return Array.from(groups.entries()).map(([groupName, options]) => ({
        groupName,
        options,
    }));
}
function groupByOpsi<T, K extends PropertyKey>(
    items: T[],
    getKey: (item: T) => K | undefined
): Map<K, T[]> {
    const result = new Map<K, T[]>();

    for (const item of items) {
        const key = getKey(item);

        if (key === undefined) continue;

        const group = result.get(key);

        if (group) {
            group.push(item);
        } else {
            result.set(key, [item]);
        }
    }

    return result;
}
export function groupToolbarOptionsBubble(
    options: ButtonMenuTiptap[]
): GroupSectionsMenuBubble[] {
    return [...groupByOpsi(options, item => item.group)].map(
        ([groupName, options]) => ({
            groupName,
            options,
        })
    );
}