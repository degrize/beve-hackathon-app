package com.hackathon.beve.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.hackathon.beve.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DonnateurDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DonnateurDTO.class);
        DonnateurDTO donnateurDTO1 = new DonnateurDTO();
        donnateurDTO1.setId(1L);
        DonnateurDTO donnateurDTO2 = new DonnateurDTO();
        assertThat(donnateurDTO1).isNotEqualTo(donnateurDTO2);
        donnateurDTO2.setId(donnateurDTO1.getId());
        assertThat(donnateurDTO1).isEqualTo(donnateurDTO2);
        donnateurDTO2.setId(2L);
        assertThat(donnateurDTO1).isNotEqualTo(donnateurDTO2);
        donnateurDTO1.setId(null);
        assertThat(donnateurDTO1).isNotEqualTo(donnateurDTO2);
    }
}
