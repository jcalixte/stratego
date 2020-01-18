import PouchDb from 'pouchdb-browser'
import { IGameDocument } from '@/models/IGameDocument'
import BusService from '@/services/BusService'
import { joinGame } from '@/services/DocumentService'

class Database {
  private local = new PouchDb('stratego')
  private db = new PouchDb('https://juliencalixte.ddns.net/database/stratego')
  private live: PouchDB.Replication.Sync<{}> | null = null

  public async save(game: IGameDocument) {
    await this.local.put(game)
  }

  public async saveRemote(game: IGameDocument) {
    await this.db.put(game)
  }

  public async get(id: string): Promise<IGameDocument | null> {
    const document = await this.db.get(id)
    if (!document) {
      return null
    }
    return document as IGameDocument
  }

  public async joinGame(id: string, uuid: string) {
    const document = await this.db.get<IGameDocument>(id)
    if (document) {
      await this.db.put(joinGame(document, uuid))
      this.initLive(id)
    }
  }

  public initLive(id: string) {
    if (this.live) {
      this.resetLive()
    }
    this.live = this.local
      .sync(this.db, {
        live: true,
        retry: true,
        doc_ids: [id]
      })
      .on('change', ({ change }) => {
        const document = change.docs.find((doc) => doc._id === id)
        BusService.emit('update', document)
      })
  }

  private resetLive() {
    if (this.live) {
      this.live.cancel()
      this.live = null
    }
  }
}

export default new Database()
