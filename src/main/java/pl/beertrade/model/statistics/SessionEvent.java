package pl.beertrade.model.statistics;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import pl.beertrade.model.statistics.enums.SessionType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

@Entity
@Builder
@Table(name = "SESSION_EVENT")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode
@ToString
public class SessionEvent {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(updatable = false)
    private UUID id;

    @NotNull
    private Date date;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Setter
    @Getter
    private SessionType type;

}
