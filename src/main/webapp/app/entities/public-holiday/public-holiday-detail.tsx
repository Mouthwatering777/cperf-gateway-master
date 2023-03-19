import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './public-holiday.reducer';
import { IPublicHoliday } from 'app/shared/model/public-holiday.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPublicHolidayDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PublicHolidayDetail = (props: IPublicHolidayDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { publicHolidayEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="microgatewayApp.publicHoliday.detail.title">PublicHoliday</Translate> [<b>{publicHolidayEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="microgatewayApp.publicHoliday.name">Name</Translate>
            </span>
          </dt>
          <dd>{publicHolidayEntity.name}</dd>
          <dt>
            <span id="ofDate">
              <Translate contentKey="microgatewayApp.publicHoliday.ofDate">Of Date</Translate>
            </span>
          </dt>
          <dd>
            {publicHolidayEntity.ofDate ? (
              <TextFormat value={publicHolidayEntity.ofDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/public-holiday" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/public-holiday/${publicHolidayEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ publicHoliday }: IRootState) => ({
  publicHolidayEntity: publicHoliday.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PublicHolidayDetail);
