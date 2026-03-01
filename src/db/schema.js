const { Table, Column, Model, DataType, Index, EnumType, ForeignKey, BelongsTo } = require('drizzle-orm/postgres-knex');
const drizzle = require('drizzle-orm');

const { match_status_enum } = require('./enums');

const schema = drizzle.schema;

const db = drizzle({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});

const Matches = Table('matches', {
  columns: {
    id:          { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    sport:       { type: DataType.STRING },
    homeTeam:    { type: DataType.STRING },
    awayTeam:    { type: DataType.STRING },
    status:      { type: EnumType('match_status_enum') },
    startTime:   { type: DataType.DATE },
    endTime:    { type: DataType.DATE },
    homeScore:   { type: DataType.INTEGER, defaultValue: 0 },
    awayScore:   { type: DataType.INTEGER, defaultValue: 0 },
    createdAt:   { type: DataType.DATE, defaultValue: drizzle.fn.now() },
  },
});

const Commentary = Table('commentary', {
  columns: {
    id:          { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    matchId:     { type: DataType.INTEGER, references: 'id', inTable: 'matches', onUpdate: 'CASCADE', onDelete: 'CASCADE' },
    minute:      { type: DataType.INTEGER },
    sequence:    { type: DataType.INTEGER },
    period:      { type: DataType.STRING },
    eventType:    { type: DataType.STRING },
    actor:       { type: DataType.STRING },
    team:        { type: DataType.STRING },
    message:     { type: DataType.TEXT },
    metadata:    { type: DataType.JSONB },
    tags:        { type: DataType.ARRAY(DataType.STRING) },
    createdAt:   { type: DataType.DATE, defaultValue: drizzle.fn.now() },
  },
});

module.exports = {
  db,
  match_status_enum,
  Matches,
  Commentary,
};