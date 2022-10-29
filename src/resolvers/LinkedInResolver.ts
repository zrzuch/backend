import { Query, Resolver } from "type-graphql";
import { LinkedInProfile } from "../entities/LinkedInProfile";
import fetch from 'node-fetch';

@Resolver()
export class LinkedInResolver {
    
    @Query(returns => LinkedInProfile)
    public async getMyLinkedInProfile(): Promise<void> {
        const id = await this.init();
        // const profile = await this.client.profile.getOwnProfile();
        // return new LinkedInProfile(profile);
    }

    private async init(): Promise<string> {
        // get it from secrets manager
        const client_id = "777croywzfwm2s";
        const client_secret = "RGR7lxRwlvwURsSL";
        const access_token = 'AQWOybvf2NaR_MRtpaEKMi7MDW3DGPlJUZEvIujASOe5WnPo44i76MixhkKwAgIt5NYuW1eS7QWlIEbgDeKAkZdMR1YU1-hqqZuSKjCH4BC_kZVQqkehomDQZjprwMq5QZtTpeBepRd3_cGPeAcn43OP5LPxkbUXfZ7UuNK8wDxbMGCXdA37oUcxyzSct_DxtR5drNRDwLC2kIWHJyjXStU47Jp6Q5-UXvW-mp_r4yfCd4dA6CD86lEvy7ayPym5Df7Hdt4xQiyUXOL2FI6sWU7YEPoWb9pjgOw2F7kh1J1xiUdNZy5BWFvqWsugD-3Zn1PPNhbU6c_F5EDM_9J3yHMiRQwZ5g';
        const res = await fetch('https://api.linkedin.com/v2/me', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        const id = JSON.parse(await res.text()).id;
        console.log(id);
        return id;
    }
}