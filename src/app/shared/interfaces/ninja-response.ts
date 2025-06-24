import { BoundingBoxInterface } from "./bounding-box";

export interface NinjaResponseInterface {
  text: string;
  bounding_box: BoundingBoxInterface;
}