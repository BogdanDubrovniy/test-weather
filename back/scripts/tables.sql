create table cities(
                       id uuid DEFAULT gen_random_uuid() primary key,
                       name varchar(50) not null,
                       created_at timestamp with time zone NOT NULL DEFAULT now(),
                       updated_at timestamp with time zone NOT NULL DEFAULT now()
);

create index cities_name_indx on cities(name);

insert into cities(name) values('Berlin');
insert into cities(name) values('NewYork');
insert into cities(name) values('Tokyo');
insert into cities(name) values('SaoPaulo');
insert into cities(name) values('CapeTown');
--
create table statistics(
                           id uuid DEFAULT gen_random_uuid() primary key,
                           open decimal not null,
                           close decimal not null,
                           high decimal not null,
                           low decimal not null,
                           timestamp varchar(30) not null,
                           city_id uuid references cities(id),
                           created_at timestamp with time zone NOT NULL DEFAULT now(),
                           updated_at timestamp with time zone NOT NULL DEFAULT now()
);

create index statistics_timestamp_indx on statistics(timestamp);
create index statistics_city_id_indx on statistics(city_id);
create unique index statistics_city_id_timestamp on statistics(city_id, timestamp);
