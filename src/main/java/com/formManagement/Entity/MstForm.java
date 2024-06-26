package com.formManagement.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class MstForm {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String formId;

    private String title;

    private String aliasName;

    private Integer moduleId;

    private Integer characteristicId;

    private Integer subCharacteristicId;

    private Integer recurrenceId;

    private Integer monthId;

    private Integer compliancePeriod;

    private String effectiveDate;

    private String text;

    private int active = 1;

    private Long createBy;

    private Long modifyBy;

    @CreationTimestamp
    private LocalDateTime createOn;

    @UpdateTimestamp
    private LocalDateTime modifiedOn;

    @OneToMany(mappedBy = "form", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<MstFormQuestion> questions;

}
