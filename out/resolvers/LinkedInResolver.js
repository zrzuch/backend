"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedInResolver = void 0;
const type_graphql_1 = require("type-graphql");
const LinkedInProfile_1 = require("../entities/LinkedInProfile");
const node_fetch_1 = __importDefault(require("node-fetch"));
let LinkedInResolver = class LinkedInResolver {
    getMyLinkedInProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.init();
            // const profile = await this.client.profile.getOwnProfile();
            // return new LinkedInProfile(profile);
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // get it from secrets manager
            const client_id = "777croywzfwm2s";
            const client_secret = "RGR7lxRwlvwURsSL";
            const access_token = 'AQWOybvf2NaR_MRtpaEKMi7MDW3DGPlJUZEvIujASOe5WnPo44i76MixhkKwAgIt5NYuW1eS7QWlIEbgDeKAkZdMR1YU1-hqqZuSKjCH4BC_kZVQqkehomDQZjprwMq5QZtTpeBepRd3_cGPeAcn43OP5LPxkbUXfZ7UuNK8wDxbMGCXdA37oUcxyzSct_DxtR5drNRDwLC2kIWHJyjXStU47Jp6Q5-UXvW-mp_r4yfCd4dA6CD86lEvy7ayPym5Df7Hdt4xQiyUXOL2FI6sWU7YEPoWb9pjgOw2F7kh1J1xiUdNZy5BWFvqWsugD-3Zn1PPNhbU6c_F5EDM_9J3yHMiRQwZ5g';
            const res = yield (0, node_fetch_1.default)('https://api.linkedin.com/v2/me', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            });
            const id = JSON.parse(yield res.text()).id;
            console.log(id);
            return id;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(returns => LinkedInProfile_1.LinkedInProfile)
], LinkedInResolver.prototype, "getMyLinkedInProfile", null);
LinkedInResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], LinkedInResolver);
exports.LinkedInResolver = LinkedInResolver;
//# sourceMappingURL=LinkedInResolver.js.map