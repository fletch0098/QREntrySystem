using System;
using System.Collections.Generic;
using System.Text;
using QREntry.Library.Model;
using Microsoft.Extensions.Logging;
using System.Linq;

namespace QREntry.DataAccess.RepositoryManager
{
    public class ControlledEntryManager : IDataRepository<ControlledEntry, int>
    {
        MyAppContext ctx;
        private readonly ILogger<ControlledEntryManager> _logger;

        public ControlledEntryManager(MyAppContext c, ILogger<ControlledEntryManager> logger)
        {
            ctx = c;
            _logger = logger;
        }

        public ControlledEntry Get(int id)
        {
            ControlledEntry ret = null;

            try
            {
                var query = (from q in ctx.ControlledEntries
                             where q.id == id
                             select q).FirstOrDefault();

                if (query != null)
                {
                    ret = query;
                    _logger.LogInformation(string.Format("{0} : Found ControlledEntry with Id {1}", System.Reflection.MethodBase.GetCurrentMethod(), id));
                }
                else
                {
                    _logger.LogWarning(string.Format("{0} : No ControlledEntries were found for id {1}", System.Reflection.MethodBase.GetCurrentMethod(),id));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, string.Format("{0} : An error occured while looking for ControlledEntrie id {1}", System.Reflection.MethodBase.GetCurrentMethod(),id));
            }

            return ret;
        }

        public IEnumerable<ControlledEntry> GetAll()
        {
            IEnumerable<ControlledEntry> ret = null;

            try
            {
                var query = ctx.ControlledEntries;

                if (query != null)
                {
                    ret = query.ToList();
                    _logger.LogInformation(string.Format("{0} : {1} ControlledEntries found", System.Reflection.MethodBase.GetCurrentMethod(), ret.Count()));
                }
                else
                {
                    _logger.LogWarning(string.Format("{0} : No ControlledEntries were found", System.Reflection.MethodBase.GetCurrentMethod()));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, string.Format("{0} : An error occured while looking for ControlledEntries", System.Reflection.MethodBase.GetCurrentMethod()));
            }

            return ret;
        }

        public int Add(ControlledEntry ControlledEntry)
        {
            int ret = 0;

            try
            {
                ControlledEntry.lastModified = DateTime.Now;
                ctx.ControlledEntries.Add(ControlledEntry);
                var updatedItems = ctx.SaveChanges();

                if (updatedItems > 0)
                {
                    ret = ControlledEntry.id;
                    
                    _logger.LogInformation(string.Format("{0} : Added ControlledEntry with Id {1}", System.Reflection.MethodBase.GetCurrentMethod(),ret));
                }
                else
                {
                    _logger.LogWarning(string.Format("{0} : No ControlledEntries were added", System.Reflection.MethodBase.GetCurrentMethod()));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, string.Format("{0} : An error occured while adding to ControlledEntries", System.Reflection.MethodBase.GetCurrentMethod()));
            }

            return ret;
        }

        public int Delete(int id)
        {
            int ret = 0;

            try
            {
                var ControlledEntry = ctx.ControlledEntries.FirstOrDefault(b => b.id == id);
                if (ControlledEntry != null)
                {
                    ctx.ControlledEntries.Remove(ControlledEntry);
                    var updatedItems = ctx.SaveChanges();

                    if (updatedItems > 0)
                    {
                        ret = ControlledEntry.id;
                        _logger.LogInformation(string.Format("{0} : Deleted ControlledEntry with Id {1}", System.Reflection.MethodBase.GetCurrentMethod(), ret));
                    }
                    else
                    {
                        _logger.LogWarning(string.Format("{0} : No ControlledEntries were deleted", System.Reflection.MethodBase.GetCurrentMethod()));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, string.Format("{0} : An error occured while deleting from ControlledEntries", System.Reflection.MethodBase.GetCurrentMethod()));
            }

            return ret;
        }

        public int Update(int id, ControlledEntry item)
        {
            int ret = 0;

            try
            {
                var ControlledEntry = ctx.ControlledEntries.Find(id);
                if (ControlledEntry != null)
                {
                    ControlledEntry.description = item.description;
                    ControlledEntry.name = item.name;
                    ControlledEntry.lastModified = DateTime.Now;

                    ret = ctx.SaveChanges();

                    ret = ControlledEntry.id;
                    _logger.LogInformation(string.Format("{0} : Updated ControlledEntry with Id {1}", System.Reflection.MethodBase.GetCurrentMethod(), ret));
                }
                else
                {
                    _logger.LogWarning(string.Format("{0} : No ControlledEntries were updated", System.Reflection.MethodBase.GetCurrentMethod()));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, string.Format("{0} : An error occured while updating from ControlledEntries", System.Reflection.MethodBase.GetCurrentMethod()));
            }

            return ret;
        }
    }
}
