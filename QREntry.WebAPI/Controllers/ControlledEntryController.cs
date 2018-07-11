using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QREntry.DataAccess;
using QREntry.DataAccess.RepositoryManager;
using QREntry.Library.Model;

namespace QREntry.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ControlledEntryController : Controller
    {
        private readonly ILogger<ControlledEntryController> _logger;
        private IDataRepository<ControlledEntry, int> _iRepo;

        public ControlledEntryController(IDataRepository<ControlledEntry, int> repo, ILogger<ControlledEntryController> logger)
        {
            _iRepo = repo;
            _logger = logger;
        }

        // GET api/[Controller]
        [HttpGet]
        public IActionResult GetAll()
        {
            _logger.LogDebug("GET api/ControlledEntry");
            IActionResult ret = null;

            var item = _iRepo.GetAll();

            if (item == null)
            {
                ret = NotFound();
            }
            else
            {
                ret = new ObjectResult(item);
            }

            _logger.LogDebug("GET api/ControlledEntry returned : {0}", ret);
            return ret;
        }

        // GET api/[Controller]/5
        [HttpGet("{id}", Name = "GetControlledEntry")]
        public IActionResult Get(int id)
        {
            _logger.LogDebug("GET api/ControlledEntry/{0}", id);
            IActionResult ret = null;

            var item = _iRepo.Get(id);

            if (item == null)
            {
                ret = NotFound();
            }
            else
            {
                ret = new ObjectResult(item);
            }
            _logger.LogDebug("GET api/ControlledEntry/{0} returned : {1}", id, ret);
            return ret;
        }

        [HttpPost]
        public IActionResult Post([FromBody] ControlledEntry item)
        {
            _logger.LogDebug("GET api/ControlledEntry/post");
            IActionResult ret = null;

            if (item == null)
            {
                ret = BadRequest();
            }
            else
            {
                var id = _iRepo.Add(item);
                ret = CreatedAtRoute("GetControlledEntry", new { id = item.id }, item);
            }

            _logger.LogDebug("GET api/ControlledEntry/post returned : {0}", ret);
            return ret;
        }

        [HttpPut]
        public IActionResult Put([FromBody] ControlledEntry item)
        {
            _logger.LogDebug("GET api/ControlledEntry/Put");
            IActionResult ret = null;

            if (item == null)
            {
                ret = BadRequest();
            }

            else
            {
                var updatedId = _iRepo.Update(item.id, item);

                if (updatedId == 0)
                {
                    ret = NotFound();
                }
                else
                {
                    ret = new ObjectResult(updatedId);
                }
            }
            _logger.LogDebug("GET api/ControlledEntry/put returned : {0}", ret);
            return ret;
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogDebug("GET api/ControlledEntry/Delete");
            IActionResult ret = null;

            var item = _iRepo.Get(id);

            if (item == null)
            {
                ret = NotFound();
            }
            else
            {
                var deletedId = _iRepo.Delete(id);
                ret = new ObjectResult(deletedId);
            }
            _logger.LogDebug("GET api/ControlledEntry/Delete returned : {0}", ret);
            return ret;
        }
    }
}
