package com.hackathon.beve.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.hackathon.beve.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ReseauxSociauxDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReseauxSociauxDTO.class);
        ReseauxSociauxDTO reseauxSociauxDTO1 = new ReseauxSociauxDTO();
        reseauxSociauxDTO1.setId(1L);
        ReseauxSociauxDTO reseauxSociauxDTO2 = new ReseauxSociauxDTO();
        assertThat(reseauxSociauxDTO1).isNotEqualTo(reseauxSociauxDTO2);
        reseauxSociauxDTO2.setId(reseauxSociauxDTO1.getId());
        assertThat(reseauxSociauxDTO1).isEqualTo(reseauxSociauxDTO2);
        reseauxSociauxDTO2.setId(2L);
        assertThat(reseauxSociauxDTO1).isNotEqualTo(reseauxSociauxDTO2);
        reseauxSociauxDTO1.setId(null);
        assertThat(reseauxSociauxDTO1).isNotEqualTo(reseauxSociauxDTO2);
    }
}
