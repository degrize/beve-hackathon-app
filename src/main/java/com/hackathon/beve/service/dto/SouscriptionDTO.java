package com.hackathon.beve.service.dto;

import com.hackathon.beve.domain.enumeration.EtatCompte;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.hackathon.beve.domain.Souscription} entity.
 */
public class SouscriptionDTO implements Serializable {

    private Long id;

    @NotNull
    private EtatCompte etat;

    @NotNull
    private Double montant;

    @NotNull
    private Double pourcentageDuDon;

    private Set<CreateurAfricainDTO> createurAfricains = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EtatCompte getEtat() {
        return etat;
    }

    public void setEtat(EtatCompte etat) {
        this.etat = etat;
    }

    public Double getMontant() {
        return montant;
    }

    public void setMontant(Double montant) {
        this.montant = montant;
    }

    public Double getPourcentageDuDon() {
        return pourcentageDuDon;
    }

    public void setPourcentageDuDon(Double pourcentageDuDon) {
        this.pourcentageDuDon = pourcentageDuDon;
    }

    public Set<CreateurAfricainDTO> getCreateurAfricains() {
        return createurAfricains;
    }

    public void setCreateurAfricains(Set<CreateurAfricainDTO> createurAfricains) {
        this.createurAfricains = createurAfricains;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SouscriptionDTO)) {
            return false;
        }

        SouscriptionDTO souscriptionDTO = (SouscriptionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, souscriptionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SouscriptionDTO{" +
            "id=" + getId() +
            ", etat='" + getEtat() + "'" +
            ", montant=" + getMontant() +
            ", pourcentageDuDon=" + getPourcentageDuDon() +
            ", createurAfricains=" + getCreateurAfricains() +
            "}";
    }
}
