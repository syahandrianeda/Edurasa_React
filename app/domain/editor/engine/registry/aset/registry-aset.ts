import type { MediaResource } from "~/domain/editor/resource/media-resource";

export class AssetRegistry {

    private assets =
        new Map<
            string,
            MediaResource
        >();

    register(
        resource:
            MediaResource
    ):void {

        this.assets.set(
            // resource.assetId,
            resource.id,
            resource
        );

    }

    get(
        assetId:string
    )
    {
        return this.assets.get(
            assetId
        );
    }

}