import { SceneObject } from "../../SceneObject";
import { BoxGeometry } from "three";
import { SKIN_PARTS, SkinPart } from "./SkinPart";
import { classicSkinTextureCoordinates, SkinTextureCoordinates, slimSkinTextureCoordinates } from "./SkinTextureCoordinates";
import { classicSkinGeometries, SkinGeometries, slimSkinGeometries } from "./SkinGeometries";
import { Axis } from "../../Axis";
import { Materials } from "../../Materials";

export class SkinObject extends SceneObject {

    private slim: boolean = false;

    private skinTextureSrc?: string;
    private skinTextureWidth: number = 64;
    private skinTextureHeight: number = 64;

    private capeTextureSrc?: string;


    constructor(readonly options: SkinObjectOptions) {
        super();
        this.createMeshes();
    }

    protected createMeshes() {
        const mat = Materials.MISSING_TEXTURE;

        {
            const headGroup = this.createAndAddGroup("head", 0, 28, 0, Axis.Y, -4);

            const headGeo = this.getBoxGeometry(SkinPart.HEAD);
            const head = this.createAndAddMesh("head", headGroup, headGeo, mat, Axis.Y, 4);

            const hatGeo = this.getBoxGeometry(SkinPart.HAT);
            const hat = this.createAndAddMesh("hat", headGroup, hatGeo, mat, Axis.Y, 4);
        }

        {
            const bodyGroup = this.createAndAddGroup("body", 0, 18, 0);

            const bodyGeo = this.getBoxGeometry(SkinPart.BODY);
            const body = this.createAndAddMesh("body", bodyGroup, bodyGeo, mat);

            const jacketGeo = this.getBoxGeometry(SkinPart.JACKET);
            const jacket = this.createAndAddMesh("jacket", bodyGroup, jacketGeo, mat);
        }

        {
            {
                const leftArmGroup = this.createAndAddGroup("leftArm", -6, 18, 0, Axis.Y, 4);

                const leftArmGeo = this.getBoxGeometry(SkinPart.LEFT_ARM);
                const leftArm = this.createAndAddMesh("leftArm", leftArmGroup, leftArmGeo, mat, Axis.Y, -4);

                const leftSleeveGeo = this.getBoxGeometry(SkinPart.LEFT_SLEEVE);
                const leftSleeve = this.createAndAddMesh("leftSleeve", leftArmGroup, leftSleeveGeo, mat, Axis.Y, -4);
            }
            {
                const rightArmGroup = this.createAndAddGroup("rightArm", 6, 18, 0, Axis.Y, 4);

                const rightArmGeo = this.getBoxGeometry(SkinPart.RIGHT_ARM);
                const rightArm = this.createAndAddMesh("rightArm", rightArmGroup, rightArmGeo, mat, Axis.Y, -4);

                const rightSleeveGeo = this.getBoxGeometry(SkinPart.RIGHT_SLEEVE);
                const rightSleeve = this.createAndAddMesh("rightSleeve", rightArmGroup, rightSleeveGeo, mat, Axis.Y, -4);
            }
        }

        {
            {
                const leftLegGroup = this.createAndAddGroup("leftLeg", -2, 6, 0, Axis.Y, 4);

                const leftLegGeo = this.getBoxGeometry(SkinPart.LEFT_LEG);
                const leftLeg = this.createAndAddMesh("leftLeg", leftLegGroup, leftLegGeo, mat, Axis.Y, -4);

                const leftTrousersGeo = this.getBoxGeometry(SkinPart.LEFT_TROUSERS);
                const leftTrousers = this.createAndAddMesh("leftTrousers", leftLegGroup, leftTrousersGeo, mat, Axis.Y, -4);
            }
            {
                const rightLegGroup = this.createAndAddGroup("rightLeg", 2, 6, 0, Axis.Y, 4);

                const rightLegGeo = this.getBoxGeometry(SkinPart.RIGHT_LEG);
                const rightLeg = this.createAndAddMesh("rightLeg", rightLegGroup, rightLegGeo, mat, Axis.Y, -4);

                const rightTrousersGeo = this.getBoxGeometry(SkinPart.RIGHT_TROUSERS);
                const rightTrousers = this.createAndAddMesh("rightTrousers", rightLegGroup, rightTrousersGeo, mat, Axis.Y, -4);
            }
        }
    }


    public setSkinTexture(src: string): void {
        this.skinTextureSrc = src;

        //TODO
        const mat = Materials.getImage({
            texture: { src: src },
            transparent: true
        });
        for (let part of SKIN_PARTS) {
            let mesh = this.getMeshByName(part);
            if (mesh) {
                mesh.material = mat;
            }
        }
    }

    public setSlim(slim: boolean): void {
        if (slim !== this.slim) {
            //TODO: update geometries and mesh positions
        }
        this.slim = slim;
    }


    protected getBoxGeometry(part: SkinPart): BoxGeometry {
        const coordinates: SkinTextureCoordinates = this.slim ? slimSkinTextureCoordinates : classicSkinTextureCoordinates;
        const geometries: SkinGeometries = this.slim ? slimSkinGeometries : classicSkinGeometries;
        return this._getBoxGeometryFromDimensions(geometries[part], coordinates[part], [64, 64], [this.skinTextureWidth, this.skinTextureHeight]);
    }


}

export interface SkinObjectOptions {

}