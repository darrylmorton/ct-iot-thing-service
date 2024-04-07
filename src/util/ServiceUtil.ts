import { Thing, ThingGroup, ThingGroupDevice, ThingType } from '../types/types'

const getFirstThingArrayElement = (list: Thing[]): Thing | null => {
  return list.length === 1 ? list[0] : null
}

const getFirstThingGroupArrayElement = (list: ThingGroup[]): ThingGroup | null => {
  return list.length === 1 ? list[0] : null
}

const getFirstThingGroupDeviceArrayElement = (list: ThingGroupDevice[]): ThingGroupDevice | null => {
  return list.length === 1 ? list[0] : null
}

const getFirstThingTypeArrayElement = (list: ThingType[]): ThingType | null => {
  return list.length === 1 ? list[0] : null
}

export default {
  getFirstThingArrayElement,
  getFirstThingGroupArrayElement,
  getFirstThingGroupDeviceArrayElement,
  getFirstThingTypeArrayElement,
}
