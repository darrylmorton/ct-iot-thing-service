import { Thing, ThingGroup, ThingGroupDevice, ThingType } from '../types/types'

class ServiceUtil {
  static getFirstThingArrayElement = (list: Thing[]): Thing | null => {
    return list.length === 1 ? list[0] : null
  }

  static getFirstThingGroupArrayElement = (list: ThingGroup[]): ThingGroup | null => {
    return list.length === 1 ? list[0] : null
  }

  static getFirstThingGroupDeviceArrayElement = (list: ThingGroupDevice[]): ThingGroupDevice | null => {
    return list.length === 1 ? list[0] : null
  }

  static getFirstThingTypeArrayElement = (list: ThingType[]): ThingType | null => {
    return list.length === 1 ? list[0] : null
  }
}

export default ServiceUtil
