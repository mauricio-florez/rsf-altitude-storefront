import { removeLocaleFromPath } from "../../../components/utils/localization"

describe("removeLocaleFromPath", () => {
    it("removes locale", () => {
        const path = "https://pocstorefront.link/en-CA/s/8a6fd51d-9033-475e-9f32-9c57757d4369"
        const newPath = removeLocaleFromPath({path})
        expect(newPath).toBe("https://pocstorefront.link/s/8a6fd51d-9033-475e-9f32-9c57757d4369")
    })
})
